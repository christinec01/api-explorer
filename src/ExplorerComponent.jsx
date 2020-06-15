import React, { useState } from "react";
import Loader from "react-loader-spinner";
import "./ExplorerComponent.css";

export default function ExplorerComponent({ title, url, method, body }) {
  const [response, setResponse] = useState("");
  const [waiting, setWaiting] = useState(false);

  return (
    <div className="container">
      <Title title={title} method={method} />
      <BaseURL url={url} />
      <BodyForm
        url={url}
        body={body}
        method={method}
        onResponse={setResponse}
        waiting={waiting}
        onSetWaiting={setWaiting}
      />
      <Response response={response} />
    </div>
  );
}

function Title({ title, method }) {
  return (
    <div className="title-section">
      <h1>{title}</h1>
      {method}
    </div>
  );
}

function BaseURL({ url }) {
  return (
    <div className="url-section">
      <h2 className="section-header">Base URL</h2>
      {url}
    </div>
  );
}

function BodyForm({ url, body, method, onResponse, waiting, onSetWaiting }) {
  const [inputFields, setInputFields] = useState({
    email: "",
    "full-name": "",
    phone: "",
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          onResponse("");
          e.preventDefault();
          fetchApiExplorer({
            url,
            method,
            onSetWaiting,
            data: inputFields,
          }).then(onResponse);
        }}
      >
        <legend>
          <h2 className="section-header">Body</h2>
        </legend>
        {body.map((element, id) => (
          <FormField
            key={id}
            element={element}
            id={id}
            inputFields={inputFields}
            setInputFields={setInputFields}
          />
        ))}
        <RequestButton waiting={waiting} />
      </form>
    </div>
  );
}

function RequestButton({ waiting }) {
  return (
    <button>
      {" "}
      {!waiting ? (
        "Send requests"
      ) : (
        <Loader
          type="TailSpin"
          height={20}
          width={20}
          color="black"
          visible={waiting}
        />
      )}
    </button>
  );
}

function Response({ response, error }) {
  return (
    <div className="response-section">
      <p className="section-header">Response</p>

      {response ? (
        <div className="response-success">{JSON.stringify(response)}</div>
      ) : null}
    </div>
  );
}

// HELPER FUNCTIONS

function FormField({ element, id, inputFields, setInputFields }) {
  return (
    <div key={id} className="flex-column">
      <label htmlFor={element.name} id={element.name}>
        {capitalizeFirstLetter(element.name)}
      </label>
      <input
        id={element.name}
        type={element.type}
        placeholder={element.placeholder ? element.placeholder : ""}
        required={element.required}
        maxLength={element.maxlength && element.maxlength}
        pattern={element.pattern}
        value={inputFields[element.name]}
        onChange={(e) =>
          setInputFields({
            ...inputFields,
            [element.name]: e.target.value,
          })
        }
      />
    </div>
  );
}

function fetchApiExplorer({ url, method, data, onSetWaiting }) {
  onSetWaiting(true);
  const methodFormatted = method.toUpperCase();
  return fetch(url, {
    method: methodFormatted,
    headers: { "Content-Type": "application/json" },
    body:
      methodFormatted !== "GET" || "PUT" ? JSON.stringify({ data }) : undefined,
  })
    .then((response) => {
      onSetWaiting(false);
      if (!response.ok) {
        console.log("Network response was not okay");
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      onSetWaiting(false);
      console.error("There was an issue:", error);
    });
}

function capitalizeFirstLetter(string) {
  const FIRST_CHAR = /^\w/;
  return string.replace(FIRST_CHAR, (c) => c.toUpperCase());
}
