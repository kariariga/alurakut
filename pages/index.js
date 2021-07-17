import { useEffect, useState } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import ProfileSideBar from "../src/components/ProfileSideBar";
import ProfileRelationsBox from "../src/components/ProfileRelationsBox";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

export default function Home(props) {
  const githubUser = props.githubUser;
  const [friends, setFriends] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(function () {
    // API Github
    fetch(`https://api.github.com/users/${githubUser}/following`)
      .then((response) => response.json())
      .then(function (finalResult) {
        const followersMap = finalResult.map(({ id, login, avatar_url }) => ({
          id: id,
          name: login,
          imageUrl: avatar_url,
          category: "followers",
        }));
        return setFollowers(followersMap);
      });

    // API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "e54eeee2c069a06d361be6dc7c1ba0",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            name
            imageUrl
            category
            creatorSlug
          },
          allFriends {
            id
            name
            imageUrl
            category
          }
        }`,
      }),
    })
      .then((response) => response.json())
      .then((finalResult) => {
        setCommunities(finalResult.data.allCommunities);
        setFriends(finalResult.data.allFriends);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCreateCommunity(e) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const community = {
                  name: formData.get("title"),
                  imageUrl: formData.get("image"),
                  category: "communities",
                  creatorSlug: githubUser,
                };

                fetch("/api/communities", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(community),
                }).then(async (response) => {
                  const data = await response.json();
                  const allCommunities = [...communities, data.record];
                  setCommunities(allCommunities);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa."
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Amigos" section={friends} />
          <ProfileRelationsBox title="Comunidades" section={communities} />
          <ProfileRelationsBox title="Seguidores" section={followers} />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  const isAuthenticated = await fetch(
    `https://api.github.com/users/${githubUser}`
  )
    .then((response) => response.json())
    .then((result) => {
      return result.message === "Not Found" || !result ? false : true;
    });

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubUser,
    },
  };
}
