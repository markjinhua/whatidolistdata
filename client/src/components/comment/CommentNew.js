import React from "react";
import { useSelector } from "react-redux";
const CommentNew = (props) => {
  const user = useSelector((state) => state.user);
  const { profile } = user;
  return (
    <form
      onSubmit={(e) => {
        props.handleSubmitComment(e);
      }}
    >
      <div className="input-column">
        <div className="image-wrapper">
          {profile?.imageUrl ? (
            <img
              loading="lazy"
              width="200"
              height="200"
              style={{
                height: "45px",
                width: "45px",
                borderRadius: "50%",
                objectFit: "cover",
                background: "grey",
              }}
              src={
                profile?.imageUrl
                  ? profile?.imageUrl?.cdnUrl
                  : "/img/profile.png"
              }
              alt="profile"
            />
          ) : (
            <img
              loading="lazy"
              role="presentation"
              alt="presentation"
              src="/img/person.jpg"
              className="comment-user"
              style={{
                height: "45px",
                width: "45px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </div>
      <div className="input-column full-width">
        <div className="input-row">
          <textarea
            name="text"
            rows="1"
            maxLength="10000"
            placeholder="Add a public comment..."
            autoComplete="off"
            value={props.text}
            onChange={(e) => {
              props.handleChangeText(e.target.value);
            }}
            onFocus={() => {
              props.handleShowButton(true, null);
            }}
            onBlur={() => {
              props.text.length === 0
                ? props.handleShowButton(false, null)
                : props.handleShowButton(true, null);
            }}
          />
        </div>
        {props.showButton && (
          <div className="input-row">
            <div className="button-wrapper">
              <button
                className="button-cancel"
                onClick={() => props.handleShowButton(false, "cancel")}
              >
                Cancel
              </button>
              <button type="submit">Comment</button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentNew;
