import { useParams } from "react-router";

export function useClientController() {
  const { govId } = useParams<{ govId: string }>();

  return {
    govId
  };
}
