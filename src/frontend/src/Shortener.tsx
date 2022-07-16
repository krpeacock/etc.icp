import React, { useMemo } from "react";
import { useState } from "react";
import { etc } from "./actor";
import CopyButton from "./CopyButton";

type ShortenedPair = { url: string; shortened: string };

const Shortener = () => {
  const [pair, setPair] = React.useState<ShortenedPair>();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pending) return;
    const text = (
      (e.target as HTMLFormElement).querySelector("input") as HTMLInputElement
    ).value;
    try {
      const url = new URL(text).toString();

      setPending(true);
      setErrorMessage("");

      etc
        .shortenBasic(url)
        .then((shortened) => {
          setPending(false);
          setPair({
            url: url ?? "",
            shortened,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid URL");
      document.querySelector<HTMLInputElement>("#url")?.focus?.();
      return false;
    }

    return false;
  };

  const link = useMemo(
    () => `${location.origin}/r/${pair?.shortened}`,
    [location, pair]
  );

  return (
    <section>
      <form
        id="shortener-form"
        action=""
        aria-disabled={pending}
        onSubmit={handleSubmit}
      >
        <label htmlFor="url" id="url-label">
          <span>Enter the link you would like shortened</span>
          <input
            type="text"
            id="url"
            name="url"
            autoFocus={true}
            disabled={pending}
            onChange={() => {
              setErrorMessage("");
            }}
          />
        </label>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <button type="submit" disabled={pending}>
          Submit
        </button>
      </form>
      {pair ? (
        <section id="output">
          Your custom shortened URL is <a href={link}>{link}</a>
          <CopyButton text={link} />
        </section>
      ) : null}
    </section>
  );
};

export default Shortener;
