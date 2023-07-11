import React, { useEffect } from 'react';

function AlbumTracks(props) {
  // console.log("PROPS from ALBUM TRACKS:::", props);
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