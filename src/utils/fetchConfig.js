export default function useSiteConfig() {
  const [config, setConfig] = useState({
    title: import.meta.env.VITE_SITE_TITLE || "Nice2B",
    description: import.meta.env.VITE_SITE_DESCRIPTION || "",
  });

  useEffect(() => {
    fetch("https://nice2b.me/wp-json/bedrock/v1/config")
      .then(res => res.json())
      .then(data => {
        setConfig({
          title: data?.title || config.title,
          description: data?.description || config.description
        });
      })
      .catch(err => console.warn("Fallback to env: ", err));
  }, []);

  return config;
}
