import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Timestamp } from "firebase/firestore";
import { postContentAPI } from "../actions";

function PostModal(props) {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [shareVideo, setShareVIdeo] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [modalState, setModalState] = useState("open");

  const switchMediaType = (media) => {
    setShareImage("");
    setShareVIdeo("");
    setMediaType(media);
  };

  const postContent = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      image: shareImage,
      video: shareVideo,
      user: props.user,
      description: editorText,
      timestamp: Timestamp.now(),
    };
    props.postContent(payload);
    reset(e);
  };
  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, this file is a ${typeof image}`);
      return;
    } else {
      setShareImage(image);
    }
  };
  const reset = (e) => {
    setModalState("close");
    setEditorText("");
    setShareImage("");
    setShareVIdeo("");
    setMediaType("");
    props.handleClick(e);
  };
  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button
                onClick={(event) => {
                  reset(event);
                }}
              >
                <img src="/images/close-icon.svg" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user && props.user.photoURL ? (
                  <img src={props.user.photoURL} />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>
                  <h6>
                    {props.user.displayName
                      ? props.user.displayName
                      : "LinkedIn User"}
                  </h6>
                  <button>
                    <img src="/images/globe.svg" alt="" />
                    <span>Anyone</span>
                    <img src="/images/down-icon.svg" alt="" />
                  </button>
                </span>
              </UserInfo>
              <PostContent>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  type="text"
                  rows="4"
                  autoFocus={true}
                  cols="50"
                />
                <UploadImage>
                  {mediaType === "image" ? (
                    <>
                      <input
                        type="file"
                        accept=".gif, .jpg, .png, .jpeg"
                        name="image"
                        id="file"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                      <p className="upload_image">
                        <label htmlFor="file" style={{ cursor: "pointer" }}>
                          Select an image to share
                        </label>
                      </p>
                      {shareImage && (
                        <img src={URL.createObjectURL(shareImage)} />
                      )}
                    </>
                  ) : (
                    mediaType === "video" && (
                      <>
                        <input
                          type="text"
                          placeholder="Please input a video Link"
                          value={shareVideo}
                          onChange={(e) => setShareVIdeo(e.target.value)}
                        />
                        {shareVideo && (
                          <ReactPlayer width={"100%"} url={shareVideo} />
                        )}
                      </>
                    )
                  )}
                </UploadImage>

                <button>Add Hashtag</button>
              </PostContent>
            </SharedContent>
            <ShareActions>
              <div className="content-btns">
                <button>
                  <img
                    src="/images/addPhoto-icon.svg"
                    alt=""
                    onClick={() => {
                      switchMediaType("image");
                    }}
                  />
                </button>
                <button>
                  <img
                    src="/images/addVideo-icon.svg"
                    alt=""
                    onClick={() => {
                      switchMediaType("video");
                    }}
                  />
                </button>
                <button>
                  <img src="/images/addDoc-icon.svg" alt="" />
                </button>
                <button>
                  <img src="/images/hiring-icon.svg" alt="" />
                </button>
                <button>
                  <img src="/images/celebrate-icon.svg" alt="" />
                </button>
                <button>
                  <img src="/images/poll-icon.svg" alt="" />
                </button>
                <button>
                  <img src="/images/ellipses.svg" alt="" />
                </button>
              </div>
              <PostButton
                disabled={editorText.length === 0 ? true : false}
                onClick={(e) => postContent(e)}
              >
                Post
              </PostButton>
            </ShareActions>
          </Content>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: openModal 0.5s ease-in forwards;
  @keyframes openModal {
    0% {
      opacity: 0;
      transform: scaleY(0.005) scaleX(0);
    }
    50% {
      opacity: 0.5;
      transform: scaleY(0.005) scaleX(1);
    }
    100% {
      opacity: 1;
      transform: scaleY(1) scaleX(1);
    }
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  margin: 0 auto;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
`;
const Header = styled.div`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 5px;
  line-height: 1.5;
  font-weight: 400;
  img {
    pointer-events: none;
  }
  h2 {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    background: transparent;
    border: none;
    border-radius: 50%;
    padding: 6px;
    height: 48px;
    width: 48px;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 4px 8px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  span {
    font-size: 18px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    button {
      justify-content: space-evenly;
      max-height: 30px;
      display: flex;
      max-width: 120px;
      padding: 4px 16px;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.7);
      border-radius: 24px;
      background: transparent;
      span {
        font-size: 16px;
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 300;
      }
      img {
        max-widht: 16px;
        max-height: 16px;
        margin-right: -2px;
      }
      &:hover {
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
        background-color: rgba(0, 0, 0, 0.15);
      }
    }
    h6 {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      &:hover {
        color: #0a66c2;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
  }
`;

const PostContent = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  button {
    margin-top: 5px;
    padding: 4px;
    background: transparent;
    border: none;
    font-size: 18px;
    max-width: 125px;
    color: #0a66c2;
    font-weight: bold;
    border-radius: 5px;
    &:hover {
      background: lightblue;
    }
  }
  textarea {
    font-size: 14px;
    border: none;
    resize: none;
    outline: none;
    height: 150px;
  }
`;
const ShareActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  .content-btns {
    margin: 4px 0;
    display: flex;
    padding: 4px;
    justify-content: space-between;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    button {
      padding: 8px;
      background: transparent;
      border: none;
      border-radius: 50%;
      &:hover {
        background: rgba(0, 0, 0, 0.15);
      }
    }
  }
  
  }
`;
const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding: 8px 16px;
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "#fff")};
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  height: 70%;
  border: none;
  transition: all 167ms ease-in;
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const UploadImage = styled.div`
  text-align: center;
  input[type="text"] {
    width: 100%;
    height: 35px;
    font-size: 18px;
  }
  .upload_image {
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 4px;
    background: transparent;
    border: none;
    font-size: 18px;
    color: #0a66c2;
    font-weight: bold;
    border-radius: 5px;
    width: 70%;
    & > label {
    }
    &:hover {
      background: lightblue;
    }
  }
  img {
    width: 100%;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postContent: (payload) => {
    dispatch(postContentAPI(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
