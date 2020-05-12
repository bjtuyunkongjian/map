let uid = Date.now();

export default function CreateUid() {
  return (uid++).toString(36);
}
