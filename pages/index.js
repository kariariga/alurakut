import { useEffect, useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import ProfileRelationsBox from "../src/components/ProfileRelationsBox";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`http://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "kariariga";
  const friends = [
    "kellyalves87",
    "RafaelGiro",
    "sabrinaTravasso",
    "cardosovanessa",
    "ghaschel",
    "tomasguerreiro",
    "mauriciocarnieletto",
    "lmarqs",
    "willtonglet",
    "jaciaramf",
  ];
  const [communities, setCommunities] = useState([
    {
      id: 1234567890,
      title: "Eu odeio acordar cedo!",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);

  const [followers, setFollowers] = useState([]);
  useEffect(function () {
    fetch("https://api.github.com/users/kariariga/following")
      .then(function (result) {
        return result.json();
      })
      .then(function (finalResult) {
        const followersMap = finalResult.map(({ id, login, avatar_url }) => ({
          id: id,
          title: login,
          image: avatar_url,
        }));
        return setFollowers(followersMap);
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
                  id: new Date().toISOString(),
                  title: formData.get("title"),
                  image: formData.get("image"),
                };

                const allCommunities = [...communities, community];
                setCommunities(allCommunities);
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
