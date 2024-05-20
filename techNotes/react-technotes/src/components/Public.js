import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="Public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Circuit Saviors!</span>
        </h1>
      </header>
      <main className="public_main">
        <p>
          Located in Beatutiful Downtown in the city of London, Circuit Saviors
          provides a trained staff ready to meet your tech repair needs.
        </p>
        <address className="public_addr">
          221B Baker Street
          <br />
          London England
          <br />
          W1U 3BW <br />
          <a href="tel:+44"> 20-1234-5678</a>
        </address>
        <br />
        <p>Owner: Sherlock Holmes</p>
      </main>
      <footer>
        <Link to="/login">Empoyee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
