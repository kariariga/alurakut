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
              <li key={item.id}>
                <a href={`/${item.category}/${item.name}`}>
                  <img src={item.imageUrl} />
                  <span>{item.name}</span>
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
