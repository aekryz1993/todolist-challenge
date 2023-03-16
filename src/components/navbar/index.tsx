import Item from "./item";

export enum NavItem {
  All = "All",
  Today = "Today",
  Completed = "Completed",
  Uncompleted = "Uncompleted",
}

export default function Navbar() {
  return (
    <div className="w-full h-14 flex items-center shrink-0 justify-around shadow">
      {Object.values(NavItem).map((item) => (
        <Item key={item} filteredBy={item} />
      ))}
    </div>
  );
}
