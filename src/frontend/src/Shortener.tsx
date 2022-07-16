import React, { useMemo } from "react";
import { useState } from "react";
import { etc } from "./actor";

type ShortenedPair = { url: string; shortened: string };

const Shortener = () => {
  const [pair, setPair] = React.useState<ShortenedPair>();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pending) return;
    // TODO: handle logic
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
      Enter the link you would like shortened
      <form action="" aria-disabled={pending} onSubmit={handleSubmit}>
        <input type="text" disabled={pending} />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <button type="submit" disabled={pending}>
          Submit
        </button>
      </form>
      {pair ? (
        <div>
          Your custom shortened URL is <a href={link}>{link}</a>
        </div>
      ) : null}
    </section>
  );
};

export default Shortener;
