import "../styles/AboutUs.css";

/**
 * React component to render the about us text. Allows for easy switching between this and the chat
 * section. 
 */
export default function AboutUs() {
  return (
    <div aria-label="about-us" className="about-us">
      <p aria-label="about-us-text" className = "about-us-text"> 
        This is the official website for the Clover High School Peer Mediation club. 
        The purpose of peer mediation is to assist students in resolving any conflicts that they 
        are facing effectively. We seek to provide students with a place where they feel comfortable
        talking about their concerns with other students. There is an interest in peer mediation 
        because students at Clover High School need to be able to navigate their conflicts in a 
        way that will not hurt them, the person they are concerned about, or the school. 
        Peer mediation provides a way to avoid bad habits when resolving conflicts and 
        allows students to talk to those will understand them the most, peers.
      </p>
    </div>
  );
}
