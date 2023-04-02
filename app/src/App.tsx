import { useEffect, useState } from "react";
import './App.css';

export default function App() {

  interface Pessoa {
    id: number,
    nome: string,
    data_nascimento: string,
    peso: number,
    altura: number,
    idade: string
  }

  const [dados, setDados] = useState<Pessoa[]>([]);
  const [busca, setBusca] = useState('');
  const [alturaMedia, setAlturaMedia] = useState(0);
  const [pesoMedio, setPesoMedio] = useState(0);
  const [idadeMedia, setIdadeMedia] = useState(0);

  useEffect(() => {
    fetch('http://julio.software:3003/curated')
      .then(res => res.json())
      .then(function(data){
        setDados(data.data);
      });
  }, []);

  const calculaMediaPeso = (listaDePessoas: any[]) => {
    let pesoMedio = 0;
    listaDePessoas.map(lista => pesoMedio += lista.peso);
    return pesoMedio/listaDePessoas.length;
  }

  const calculaMediaAltura = (listaDePessoas: any[]) => {
    let alturaMedia = 0;
    listaDePessoas.map(lista => alturaMedia += lista.altura);
    return alturaMedia/listaDePessoas.length;
  }

  const calculaIdadeMedia = (listaDePessoas: any[]) => {
    let idadeMedia = 0;
    listaDePessoas.map(lista => idadeMedia += lista.idade);
    return idadeMedia/listaDePessoas.length;
  }

  const resultado = busca.length > 0 ? dados.filter(dado => dado.nome.includes(busca)) : dados;

  useEffect(() => {
    setPesoMedio(calculaMediaPeso(resultado));
    setAlturaMedia(calculaMediaAltura(resultado));
    setIdadeMedia(calculaIdadeMedia(resultado));
  }, [busca, resultado]);

  return (
    <>
      <h1>People Checker</h1>

      Filter:&nbsp;
      <input
        type='text'
        onChange={(e) => setBusca(e.target.value)}
      />

      <br /><br />

      <table>
        <thead>
          <tr>
            <th>-</th>
            <th>ID</th>
            <th>Nome</th>
            <th>Dt. Nascimento</th>
            <th>
              Peso (kg)
            </th>
            <th>
              Altura (cm)
            </th>
            <th>
              Idade (yo)
            </th>
          </tr>
        </thead>

        <tbody>
          {
            resultado.map(dado => <tr key={dado.id}>
              <td><input type="checkbox" name="selected" id={`selected_${dado.id}`} /></td>
              <td style={{textAlign: 'center'}}>{dado.id}</td>
              <td>{dado.nome}</td>
              <td>{dado.data_nascimento.replace('T00:00:00.000Z', '')}</td>
              <td style={{textAlign: 'center'}}>{dado.peso}</td>
              <td style={{textAlign: 'center'}}>{dado.altura}</td>
              <td style={{textAlign: 'center'}}>{dado.idade}</td>
            </tr>)
          }
        </tbody>

        <tfoot>
          <td style={{textAlign: 'center'}} colSpan={4}>Media</td>
          <td><span className='average'>{isNaN(pesoMedio) ? 0 : Math.floor(pesoMedio)}</span></td>
          <td><span className='average'>{isNaN(alturaMedia) ? 0 : Math.floor(alturaMedia)}</span></td>
          <td><span className='average'>{isNaN(idadeMedia) ? 0 : Math.round(idadeMedia)}</span></td>
        </tfoot>
      </table>
    </>
  );
}
