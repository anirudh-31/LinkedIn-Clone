import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getArticleAPI } from "../actions";

function Main(props) {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <Container>
      <ShareBox>
        <div>
          <img
            src={
              props.user && props.user.photoURL
                ? props.user.photoURL
                : "/images/user.svg"
            }
            alt="user"
          />
          <button onClick={handleClick} disabled={props.loading ? true : false}>
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="user" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="user" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="user" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="user" />
            <span>Write Article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {props.loading && (
          <>
            <img src="/images/animation.svg" alt="loading" />
            {Math.ceil(props.progress) < 100 ? (
              <p>Uploading.... {Math.ceil(props.progress)}% completed</p>
            ) : (
              <p>Creating your Post</p>
            )}
          </>
        )}
        <>
          {props.articles.length === 0 ? (
            <div>
              <img
                src="/images/article-animation.svg"
                className="article-animation"
                alt="Loading articles"
              />
              <p>There are no posts</p>
            </div>
          ) : (
            <>
              {props.articles.length > 0 &&
                props.articles.map((article, key) => (
                  <Article key={key}>
                    <SharedActor>
                      <a>
                        <img
                          src={
                            article.actor && article.actor.image
                              ? article.actor.image
                              : "/images/user.svg"
                          }
                          alt="user"
                        />
                        <div>
                          <span>{article.actor.title}</span>
                          <span>{article.actor.email}</span>
                          <span>
                            {article.actor.date.toDate().toLocaleDateString()}
                          </span>
                        </div>
                      </a>
                      <button>
                        <img src="/images/ellipses.svg"></img>
                      </button>
                    </SharedActor>
                    <Description>{article.description}</Description>
                    {article.sharedImage || article.video ? (
                      <SharedImage>
                        {article.sharedImage ? (
                          <img src={article.sharedImage} />
                        ) : (
                          <div className="video-player">
                            <ReactPlayer
                              url={article.video}
                              width="100%"
                              controls={true}
                            />
                          </div>
                        )}
                      </SharedImage>
                    ) : (
                      <></>
                    )}
                    <SocialCounts>
                      <li>
                        <button>
                          <img src="/images/like.svg" />
                          <img src="/images/clap.svg" />
                          <img src="/images/heart.svg" />
                          <span>XYZ user and 75 others</span>
                        </button>
                      </li>
                      <li>
                        <a>2 comments</a>
                      </li>
                    </SocialCounts>
                    <SocialButtons>
                      <button>
                        <img src="/images/like-btn.svg" />
                        <span>Like</span>
                      </button>
                      <button>
                        <img src="/images/comment-btn.svg" />
                        <span>Comment</span>
                      </button>
                      <button>
                        <img src="/images/share-btn.svg" />
                        <span>Share</span>
                      </button>
                      <button>
                        <img src="/images/send-btn.svg" />
                        <span>Send</span>
                      </button>
                    </SocialButtons>
                  </Article>
                ))}
            </>
          )}
        </>
      </Content>
      <PostModal
        showModal={showModal}
        handleClick={handleClick}
        className={showModal === "close" ? "close-Modal" : ""}
      />
    </Container>
  );
}

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  position: relative;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 1px rgba(0 0 0/20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      cursor: pointer;
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      align-items: center;
      border: none;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 0px 16px 0px 16px;
      margin-top: 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 0px 8px;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        text-align: left;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      button {
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 3px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        img {
          margin: 0 4px 0 -2px;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
        }
        &: nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    outline: none;
    border: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  .video-player > video {
    position: absolute;
    object-fit: fill;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.33;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  justify-content: space-between;
  list-style-type: none;
  border-bottom: 1px solid #e9e5fd;
  li {
    maring-right: 5px;
    font-size: 12px;
    a {
      color: rgba(0, 0, 0, 0.6);
      &:hover {
        color: #0a66c2;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    img {
      margin-left: -5px;
      height: 16px;
      width: 16px;
      object-fit: contain;
    }
    span {
      color: rgba(0, 0, 0, 0.6);
      margin-left: 5px;
      font-size: 12px;
      &:hover {
        color: #0a66c2;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const SocialButtons = styled.div`
  margin: 0;
  padding: 4px 8px;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  button {
    display: flex;
    color: rgba(0, 0, 0, 0.6);
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 5px;
    padding: 12px 14px;
    transition: all 0.5ms ease-in;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
    span {
      margin-left: 5px;
    }
  }
`;
const Content = styled.div`
  text-align: center;
  .article-animation {
    width: 100px;
  }
  p {
    font-family: "Roboto Condensed", sans-serif;
    font-weight: 400;
  }
  & > img {
    width: 30px;
    object-fit: contain;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
    progress: state.articleState.progress,
  };
};
const dispatchStateToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleAPI()),
});
export default connect(mapStateToProps, dispatchStateToProps)(Main);
