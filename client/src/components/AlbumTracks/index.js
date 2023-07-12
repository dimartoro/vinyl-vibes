function AlbumTracks(props) {
  //Extracting the "side props" from props object
  const side = props.side;

  return (
    <>
      <div>
          <div className="flex-row">
            <ul>
              {props.tracks.map((track, i)=>
                <li key={`track${side}${i}`}>
                  <span>{track}</span>
                </li>
              )}
            </ul>
          </div>
      </div>
    </>
  );
}
export default AlbumTracks;