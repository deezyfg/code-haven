import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { utf8_to_b64_safe, b64_to_utf8_safe } from '../helpers/utils';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import './Executor.css';

const Executor = forwardRef(({ code, language, isRunning, setIsRunning, setOutput }, ref) => {
  const [outputDetails, setOutputDetails] = useState(null);

  useImperativeHandle(ref, () => ({
    handleCompile,
    clearOutput
  }));

  const handleCompile = () => {
    setIsRunning(true);
    const formData = {
      language_id: language,
      source_code: utf8_to_b64_safe(code),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_SECRET,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      },
      data: formData,
    };

    axios.request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setIsRunning(false);
        console.error("Compilation error:", error);
        setOutputDetails({ 
          status: { description: "Compilation Error" },
          stderr: utf8_to_b64_safe(error.message || "An error occurred during compilation")
        });
        setOutput(error.message || "An error occurred during compilation");
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_RAPID_API_URL}/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_SECRET,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // Status 1: In Queue, Status 2: Processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputDetails(response.data);
        setIsRunning(false);
        setOutput(getOutputDetails(response.data));
        return;
      }
    } catch (err) {
      console.error("Status check error:", err);
      setIsRunning(false);
      setOutputDetails({ 
        status: { description: "Error" },
        stderr: utf8_to_b64_safe("An error occurred while checking the status of your code execution")
      });
      setOutput("An error occurred while checking the status of your code execution");
    }
  };

  const getOutputDetails = (data) => {
    let statusId = data.status?.id;
    let result = "";

    if (statusId === 6) {
      // Compilation error
      result = b64_to_utf8_safe(data.compile_output);
    } else if (statusId === 3) {
      // Successful run
      result = data.stdout !== null ? b64_to_utf8_safe(data.stdout) : "";
    } else if (statusId === 5) {
      // Time Limit Exceeded
      result = "Time Limit Exceeded";
    } else {
      // Runtime error or other errors
      result = b64_to_utf8_safe(data.stderr);
    }

    return result;
  };

  const clearOutput = () => {
    setOutputDetails(null);
    setOutput('');
  };

  const handleCopyOutput = () => {
    if (outputDetails) {
      const outputText = getOutputDetails(outputDetails);
      navigator.clipboard.writeText(outputText).then(() => {
        toast.success('Output copied to clipboard!');
      }).catch(() => {
        toast.error('Failed to copy output.');
      });
    }
  };

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <pre className="error-output">
          {b64_to_utf8_safe(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      // Successful run
      return (
        <pre className="success-output">
          {outputDetails.stdout !== null
            ? `${b64_to_utf8_safe(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return (
        <pre className="error-output">
          Time Limit Exceeded
        </pre>
      );
    } else {
      // Runtime error or other errors
      return (
        <pre className="error-output">
          {b64_to_utf8_safe(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <div className="executor">
      <div className="output-header">
        <span>Output</span>
        {outputDetails && (
          <FaCopy className="copy-icon" onClick={handleCopyOutput} title="Copy output" />
        )}
      </div>
      <div className="output-window">
        {outputDetails ? getOutput() : <p className="default-output">Run your code to see the output here.</p>}
      </div>
    </div>
  );
});

export default Executor;
