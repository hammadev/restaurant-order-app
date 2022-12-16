import { Text,Link } from "@nextui-org/react";

export default function Menu(props) {

    return (
        <div className='MenuContainer'>
            {
            props.category.map((item,i) => (
                <Link href={`#cat_sec_${item.id}`} >
                    <Text h4>{item.name}</Text>
                </Link>
            ))
            }

        </div>
    );
}
