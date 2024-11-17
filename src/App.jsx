import { useState } from "react";
import { useMutation } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Inicialização do estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Função de envio do formulário
  const mutation = useMutation(
    (newData) => {
      // Simulando uma requisição POST
      return fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (data) => {
        alert("Formulário enviado com sucesso!");
        console.log(data);
        // Limpar os campos após sucesso
        setFormData({ name: "", email: "" });
      },
      onError: (error) => {
        alert("Erro ao enviar formulário!");
        console.error(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Envia a mutação com os dados do formulário
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Atualiza o campo específico
    }));
  };

  return (
    <div className="text-center">
      <h1 className="mb-3">Formulário com React Query</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input
            className="p-1 w-100 rounded-5 mb-2 ps-3"
            type="text"
            name="name" // Associando o campo ao nome para atualizar dinamicamente
            value={formData.name} // Controlando o valor com o estado
            onChange={handleChange} // Atualizando o estado no evento de mudança
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label></label>

          <input
            className="p-1 w-100 rounded-5 ps-3 mb-5"
            type="email"
            name="email" // Associando o campo ao nome para atualizar dinamicamente
            value={formData.email} // Controlando o valor com o estado
            onChange={handleChange} // Atualizando o estado no evento de mudança
            placeholder="Enter email"
            required
          />
        </div>
        <button type="submit" disabled={mutation.isLoading} className="py-1 px-5 w-100 rounded-5">
          {mutation.isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {/* Mensagens de estado baseadas nas propriedades da mutação */}
      {mutation.isError && <p>Erro: {mutation.error.message}</p>}
      {mutation.isSuccess && !mutation.isLoading && (
        <p className="text-danger">Formulário enviado com sucesso!</p>
      )}
    </div>
  );
};

export default App;
