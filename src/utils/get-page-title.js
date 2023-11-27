import { TITLE } from "@config";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${TITLE}`;
  }
  return `${TITLE}`;
}
