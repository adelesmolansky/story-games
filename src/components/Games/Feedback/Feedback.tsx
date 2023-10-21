import Layout from '../../Layout/Layout';

type props = {
  correct: boolean;
};

const Feedback = ({ correct }: props) => {
  const heading = correct ? 'Correct!' : 'Incorrect! Try again.';
  const img = correct ? '/correct_icon.png' : '/incorrect_icon.png';

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
