# Revisão do Sistema de Thiago Conte Rocha (tcr2)

## Revisão do Sistema

**O sistema está funcionando com as funcionalidades solicitadas?**

- ✅ Eu consigo adicionar, modificar e excluir alunos na página Students.
- ✅ Cada aluno tem seu nome, CPF e email.
- ✅ Eu posso criar, modificar e excluir turmas, cada uma com um tópico, ano e semestre, além da lista de alunos.
- ✅ Eu posso adicionar alunos numa turma.
- ✅ Eu posso avaliar alunos em uma turma para diferentes conceitos, atribuindo metas entre MANA, MPA ou MA.
- ✅ Eu posso editar avaliações já feitas anteriormente.
- ✅ Os alunos recebem um resumo diário por email com suas avaliações se uma nota foi alterada.
- ❌ *Eu não posso remover alunos de uma turma.

\* Não está explicitamente descrito nos requisitos do sistema

**Quais os problemas de qualidade do código e dos testes?**

- Pouca documentação, dificultando o entendimento do código.
- Poucos cenários de teste de aceitação, o que pode levar a falhas não detectadas.

**Como a funcionalidade e a qualidade desse sistema pode ser comparada com as do seu sistema?**

- O sistema tem uma funcionalidade mais completa e uma qualidade de testes de aceitação relativamente superior, dado que o desenvolvimento dos testes de aceitação do meu sistema teve que ser interrompida por conta de limites de uso aplicados recentemente ao copilot, o que fez com que os testes de aceitação do meu sistema fossem deixados em um estado incompleto. Contudo, o meu sistema possui mais testes de unidade, o que pode contribuir para uma maior qualidade do código.


## Revisão do Histórico de Desenvolvimento

**Estratégias de interação utilizadas**

- Uso de um AGENT.md para definir as capacidades do agente e as regras de interação.
- Definição inicial de um plano de ação que foi registrado no arquivo PLANNING.md, o que ajudou a guiar o desenvolvimento do sistema.
- Descrições detalhadas das ações necessárias para implementar cada funcionalidade.
- Identificação de problemas e sugestão de soluções por parte do desenvolvedor, guiando o agente a seguir um caminho de desenvolvimento mais eficiente.

**Situações em que o agente funcionou melhor ou pior**

- ✅ Funcionou melhor em:
    - Implementar funcionalidades mais simples
    - Implementar funcionalidades bem descritas pelo desenvolvedor, com poucos detalhes não explícitos
- ❌ Funcionou pior em:
    - Implementar funcionalidades mais complexas, principalmente quando havia detalhes que não foram explicitamente descritos no prompt, falhando em identificar a necessidade de implementar tais detalhes para o funcionamento correto esperado

**Tipos de problemas observados**

- O agente aparentou encontrar dificuldade para implementar detalhes não explicitamente descritos no prompt, mesmo quando tais detalhes eram necessários para o funcionamento correto esperado da funcionalidade.
- O agente não raramente implementou código com erros simples que precisaram ser identificados pelo desenvolvedor e corrigidos posteriormente.

**Avaliação geral da utilidade do agente no desenvolvimento**

- O agente foi capaz de gerar um sistema que cumpre com os requisitos solicitados, mas apresentou dificuldades ao longo do desenvolvimento que normalmente não aconteceriam com um dev que possui alguma experiência com a stack utilizada.

**Comparação com a sua experiência de uso do agente**

- Minha experiência de uso do agente foi mais negativa, encontrando problemas mais críticos, como os testes de aceitação não executarem corretamente, além de ser forçado a interromper o desenvolvimento antes de implementar a última funcionalidade (envio de emails). Apesar disso, o código gerado para as funcionalidades que foram implementadas estava relativamente bem estruturado e funcional.