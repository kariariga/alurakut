import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.section.length})
      </h2>
      <ul>
        {props.section.map((item, index) => {
          if (index <= 5) {
            return (
              <li key={item.id ? item.id : item}>
                <a href={`/users/${item.title}`}>
                  <img
                    src={
                      item.image ? item.image : `https://github.com/${item}.png`
                    }
                  />
                  <span>{item.title ? item.title : item}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default ProfileRelationsBox;
