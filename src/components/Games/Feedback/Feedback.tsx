import Layout from '../../Layout/Layout';
import './Feedback.css';

type props = {
  correct: boolean;
};

const Feedback = ({ correct }: props) => {
  const heading = correct ? 'Correct!' : 'Incorrect! Try again.';
  const img = correct
    ? '/imgs/feedback/checkmark.png'
    : '/imgs/feedback//xmark.png';

  return (
    <Layout>
      <div className="feedback-screen">
        <h1>{heading}</h1>
        <img src={img} alt={heading} />
      </div>
    </Layout>
  );
};

export default Feedback;
