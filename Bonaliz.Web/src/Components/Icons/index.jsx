import { DynamicIcon } from "lucide-react/dynamic";

export default function Icones({ icon, ...res }) {
  return <DynamicIcon name={icon} {...res} />;
}
