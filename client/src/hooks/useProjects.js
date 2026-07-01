import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";

export function useProjects(filters = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (filters.status)  params.status = filters.status;
      if (filters.author)  params.author = filters.author;
      if (filters.tag)     params.tag = filters.tag;
      if (filters.search)  params.search = filters.search;
      if (filters.pinned)  params.pinned = true;
      const res = await api.get("/projects", { params });
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  return { projects, loading, error, refetch: fetchProjects };
}

export function useMembers() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    api.get("/users/members").then((r) => setMembers(r.data)).catch(() => {});
  }, []);
  return members;
}
