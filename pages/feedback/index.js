import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>{`${item.email} said: ${item.text}`}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // you should not use fetch API inside of getStaticProps or getServerSideProps to talk to your own API
  // just import node code and directly run it 
  // this allows you to leverage the fact that all same project/same server

  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)

  return {
    props: { feedbackItems: data},
  };
}

export default FeedbackPage;
