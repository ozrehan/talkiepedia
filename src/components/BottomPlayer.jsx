import React, { useRef } from 'react';
import { useAudioPlayer } from './AudioPlayerContext';

export const BottomPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    togglePlay,
    seek,
    closePlayer,
  } = useAudioPlayer();

  const progressBarRef = useRef(null);

  if (!currentTrack) return null;

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressBarClick = (e) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercentage = clickX / width;
    seek(clickPercentage * duration);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bottom-audio-player active`}>
      <div className="player-inner">
        {/* Track Details */}
        <div className="player-track-info">
          <img
            src={currentTrack.imageUrl || 'https://talkiepedia.forgealumnus.com/images/fallback-podcast.jpg'}
            alt={currentTrack.title}
            className="player-img"
            onError={(e) => {
              e.target.src = 'https://talkiepedia.forgealumnus.com/image/logo.png';
            }}
          />
          <div className="track-details">
            <h6 className="track-title">{currentTrack.title}</h6>
            <span className="track-artist">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="player-controls">
          <div className="control-buttons">
            <button className="control-btn" title="Previous 10s" onClick={() => seek(Math.max(0, currentTime - 10))}>
              <i className="fa-solid fa-backward-step"></i>
            </button>
            <button className="control-btn btn-play-pause" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button className="control-btn" title="Forward 10s" onClick={() => seek(Math.min(duration, currentTime + 10))}>
              <i className="fa-solid fa-forward-step"></i>
            </button>
          </div>

          <div className="progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div
              className="progress-bar-wrapper"
              ref={progressBarRef}
              onClick={handleProgressBarClick}
            >
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="player-volume">
          <button className="control-btn" onClick={() => setVolume(volume === 0 ? 0.8 : 0)}>
            <i className={`fa-solid ${volume === 0 ? 'fa-volume-xmark' : volume < 0.4 ? 'fa-volume-low' : 'fa-volume-high'}`}></i>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <button className="player-close" onClick={closePlayer} title="Close Player">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
