export default function Loader({statement="Loading Questions..."}) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>{statement}</p>
      </div>
    );
  }