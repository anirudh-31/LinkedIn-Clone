import React from "react";
import styled from "styled-components";

function RightSide(props) {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>Add to your feed</h2>
          <img src="/images/feed-icon.svg" />
        </Title>
        <FeedList>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#LinkedIn</span>
              <button>Follow</button>
            </div>
          </li>
          <li>
            <a>
              <Avatar />
            </a>
            <div>
              <span>#Video</span>
              <button>Follow</button>
            </div>
          </li>
        </FeedList>
        <Recommendation>
          View all Recommendations
          <img src="/images/right-icon.svg" />
        </Recommendation>
      </FollowCard>
      <BannerCard>
        <img src="/images/recommendation.jpg" alt="" />
      </BannerCard>
    </Container>
  );
}

const Container = styled.div`
  grid-area: rightside;
`;
const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 1px rgba(0 0 0/20%);
  padding: 12px;
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
`;

const FeedList = styled.ul`
  margin-top: 16px;
  li {
    display: flex;
    align-items: center;
    position: relative;
    margin: 12px 0px;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    }
    button {
      min-width: 60px;
      border-radius: 20px;
      padding: 8px 16px;
      color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "#fff")};
      background: ${(props) =>
        props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2"};
      height: 70%;
      border: none;
      transition: all 167ms ease-in;
      &:hover {
        background: ${(props) =>
          props.disabled ? "rgba(0,0,0,0.08)" : "#004182"};
      }
    }
  }
`;
const Avatar = styled.div`
  background-image: url("/images/hashtag.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;
const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;

const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export default RightSide;
