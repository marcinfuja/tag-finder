'use client';

import Styles from './search.module.css';
import { FormEvent } from 'react';
import { useState } from 'react';
import getTagsForSinglePrompt from '@/app/api/functions/getTagsForSinglePrompt';
import getTagsForMultiplePrompts from '@/app/api/functions/getTagsForMultiplePrompts';

const Search = (props: any) => {
  const { multiple } = props;

  const [tags, setTags] = useState<string[]>([]);
  const [multiTags, setMultiTags] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    if (multiple) {
      const gptTags = await getTagsForMultiplePrompts();
      setMultiTags(gptTags);
      console.log('gptTags', gptTags);

      setLoading(false);
      return;
    }
    const form: any = event.target;
    const queryValue = form.elements.query.value;

    if (queryValue.length < 1) {
      console.log('No query. Please enter your query before generating tags');
      setLoading(false);
      return;
    }

    const gptTags = await getTagsForSinglePrompt(queryValue);

    setTags(gptTags);
    setLoading(false);
  }

  return (
    <div className={Styles.search}>
      <form id="query-form" onSubmit={onSubmit}>
        <textarea
          name="query"
          id="query"
          className={Styles.queryArea}
        ></textarea>
        <div className={Styles.btnContainer}>
          <button
            type="submit"
            className={Styles.selectAndResetBtn}
            hidden={tags.length ? false : true}
          >
            Save selected tags and find new ones
          </button>
          <button type="submit" className={Styles.searchBtn}>
            Generate Tags
          </button>
        </div>
      </form>
      {loading ? (
        `Loading...`
      ) : (
        <div className={Styles.tagContainer}>
          {tags.map((tag) => {
            return (
              <div
                className={Styles.tag}
                key={`${Math.floor(Math.random() * 10000)}-${tag}`}
              >
                {tag}
              </div>
            );
          })}
        </div>
      )}
      {multiTags &&
        multiTags.map((tagObject) => {
          return (
            <>
              <div key={`key-${tagObject.key}`} className={Styles.tagContainer}>
                <div className={Styles.prompt}>{tagObject.promptData}</div>
                {tagObject.data.map((item: any) => (
                  <div
                    key={Math.floor(Math.random() * 10000)}
                    className={Styles.tag}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <hr />
            </>
          );
        })}
    </div>
  );
};

export default Search;
