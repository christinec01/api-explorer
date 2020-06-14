import React, { useState } from "react";

export default function Explorer({ title, url, method, body }) {
  const [response, setResponse] = useState("");

  return (
    <div className="container">
      <Title title={title} method={method} />
      <BaseURL url={url} />
      <BodyForm
        url={url}
        body={body}
        method={method}
        onResponse={setResponse}
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

function BodyForm({ url, body, method, onResponse }) {
  const [inputFields, setInputFields] = useState({
    email: "",
    "full-name": "",
    phone: "",
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchApiExplorer({ url, method, data: inputFields }).then(onResponse);
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
        <button> Send requests</button>
      </form>
    </div>
  );
}

function Response({ response }) {
  return (
    <div className="response-section">
      <p className="section-header">Response</p>

      {response ? (
        <div className="response">{JSON.stringify(response)}</div>
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

function fetchApiExplorer({ url, method, data }) {
  return fetch(url, {
    method: method.toUpperCase(),
    body: JSON.stringify({ data }),
  }).then((response) => {
    if (response.ok) {
      console.debug(response.json, "json.results");
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  });
}

function capitalizeFirstLetter(string) {
  const FIRST_CHAR = /^\w/;
  return string.replace(FIRST_CHAR, (c) => c.toUpperCase());
}
