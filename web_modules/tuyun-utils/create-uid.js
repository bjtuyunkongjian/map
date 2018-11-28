let uid = Date.now();
export default function createUid() {
  return (uid++).toString(36);
}
