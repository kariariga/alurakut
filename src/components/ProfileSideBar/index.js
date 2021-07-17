import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import Box from "../Box";

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

  export default ProfileSideBar;