import React, { useEffect } from 'react';

function AlbumTracks(props) {
  console.log("TRACKS:::", props);
  return (
    <>
      <div className="my-2">
          <div className="flex-row">
            <ul>
              <li>hola</li>
              {/* {props.tracks.map((track)=>
                <li>
                  <span>{track}</span>
                </li>
              )} */}
            </ul>
          </div>
      </div>
    </>
  );
}

export default AlbumTracks;