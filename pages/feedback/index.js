import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
      <Fragment>
          {feedbackData && <p>{feedbackData.email}</p>}
          <ul>
      {props.feedbackItems.map((item) => (
        //   bind allows us to preconfigure a function for later use
        // the first argument is 'this' which we don't need here; second argument is the first fn parameter to be passed
        <li key={item.id}>
          {item.text}{" "}
          <button onClick={loadFeedbackHandler.bind(null, item.id)}>
            Show Email Address
          </button>
        </li>
      ))}
    </ul>
      </Fragment>
    
  );
}

export async function getStaticProps() {
  // you should not use fetch API inside of getStaticProps or getServerSideProps to talk to your own API
  // just import node code and directly run it
  // this allows you to leverage the fact that all same project/same server

  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: { feedbackItems: data },
  };
}

export default FeedbackPage;
