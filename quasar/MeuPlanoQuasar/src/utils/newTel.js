export function mphone(val) {
  return val.replace(/\D/g, "").length === 11
    ? "(00) 00000-0000"
    : "(00) 0000-00009";
}
