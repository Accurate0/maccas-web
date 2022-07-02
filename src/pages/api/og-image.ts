import { withOGImage } from "next-api-og-image";

interface QueryParams {
  image: string;
  name: string;
}

export default withOGImage<"query", QueryParams>({
  template: {
    html: ({ name, image }) => `<h1>${name} - ${image}</h1>`,
  },
  cacheControl: "public, max-age=0, immutable",
  dev: {
    inspectHtml: false,
  },
});
