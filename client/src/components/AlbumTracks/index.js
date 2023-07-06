import React, { useEffect } from 'react';

function AlbumTracks(props) {
  console.log("PROPS from ALBUM TRACKS:::", props);
  return (
    <>
      <div>
          <div className="flex-row">
            <ul>
              {props.tracks.map((track)=>
                <li>
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