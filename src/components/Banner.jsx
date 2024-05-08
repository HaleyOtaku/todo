export default function Banner(props) {
  return (
    <article className="banner">
      <img src={props.image} alt={props.description} height={500}/>
      <h2>{props.heading}</h2>
    </article>
  )
}