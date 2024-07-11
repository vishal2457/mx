import * as queryString from "qs";

interface FormOptions {
  type?:
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "file"
    | "file-multi"
    | "date"
    | "";
  skipField?: boolean;
}


export const qs = (options: FormOptions):string => {
  return queryString.stringify(options)
}
