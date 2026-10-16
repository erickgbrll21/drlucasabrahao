export const siteUrl = "https://institutodrlucasabrahao.com.br";

export const siteName = "Instituto Dr. Lucas Abrahão";

export const doctor = {
  name: "Dr. Lucas Abrahão Ferreira",
  shortName: "Dr. Lucas Abrahão",
  crm: "CRM GO 19862",
  phoneDisplay: "(64) 98116-8122",
  phoneTel: "+5564981168122",
  whatsapp: "5564981168122",
  instagram: "https://www.instagram.com/drlucasabrahao/",
  address: {
    street: "R. Augusto Neto, 11",
    neighborhood: "São João",
    city: "Catalão",
    state: "GO",
    postalCode: "75703-300",
  },
} as const;

export const addressLine = `${doctor.address.street} - ${doctor.address.neighborhood}, ${doctor.address.city} - ${doctor.address.state}, ${doctor.address.postalCode}`;

export const mapsQuery = encodeURIComponent(
  `${doctor.address.street}, ${doctor.address.neighborhood}, ${doctor.address.city} - ${doctor.address.state}, ${doctor.address.postalCode}`,
);

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;

export function whatsappHref(message: string) {
  return `https://wa.me/${doctor.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const whatsappGreeting = whatsappHref(
  "Olá! Vim pelo site e gostaria de agendar uma consulta com o Dr. Lucas.",
);

export const legalNotice =
  "As informações contidas neste site têm caráter informativo e educacional e não substituem, em hipótese alguma, a consulta médica presencial ou online. Resultados podem variar de paciente para paciente.";

export const consultationIncludes = [
  "Avaliação clínica completa",
  "Análise de bioimpedância de última geração",
  "Estruturação de rotina alimentar personalizada",
] as const;

export const locations = [
  {
    name: "Catalão (GO)",
    detail: addressLine,
  },
  {
    name: "Goiânia (GO)",
    detail: "Atendimento na capital. O endereço não está publicado no site.",
  },
  {
    name: "Consultas online",
    detail: "Atendimento para pacientes no Brasil.",
  },
] as const;

export const philosophy = {
  title: "Nossa filosofia de tratamento",
  lede: "Nosso modelo vai além de protocolos tradicionais. Oferecemos um cuidado integral baseado na análise global do seu metabolismo.",
  points: [
    {
      title: "Atendimento individualizado",
      text: "Estruturamos um plano personalizado a partir da sua realidade. Sem receita pronta.",
    },
    {
      title: "Acompanhamento contínuo",
      text: "Concierge premium e sistema digital. Contato contínuo para ajustes em tempo real.",
    },
    {
      title: "Ciência e responsabilidade",
      text: "Tratamentos regulamentados com medicações originais e aprovadas.",
    },
  ],
} as const;

export const education = [
  {
    title: "Medicina",
    place: "Universidade de Uberaba",
  },
  {
    title: "Pós-graduação em Cardiologia",
    place: "Hospital Israelita Albert Einstein",
  },
  {
    title: "Pós-graduação em Medicina do Esporte",
    place: "Instituto HZM",
  },
  {
    title: "Formação em Nutrologia",
    place: "Fellowship da Nutrology Academy",
  },
] as const;

export const biography =
  "Com uma abordagem global que integra ciência, tecnologia e acompanhamento humano, o Dr. Lucas dedica sua prática à saúde cardiometabólica e otimização da saúde, tratando o paciente, e não apenas sintomas.";

export const programs = [
  {
    slug: "obesidade",
    name: "Bloco de Tratamento da Obesidade",
    area: "Tratamento da obesidade",
    summary:
      "Foco na melhora da saúde metabólica, conquista de resultados sustentáveis e prevenção do reganho de peso a longo prazo.",
  },
  {
    slug: "performance",
    name: "Bloco de Performance Esportiva",
    area: "Performance e otimização para atletas",
    summary:
      "Otimização de rendimento, recuperação muscular e ajustes finos essenciais para atletas amadores e profissionais.",
  },
  {
    slug: "envelhecimento",
    name: "Prevenção do Envelhecimento",
    area: "Prevenção do envelhecimento precoce",
    summary:
      "Estratégias científicas para manter o vigor físico, mental e qualidade de vida ao longo do processo de envelhecimento.",
  },
  {
    slug: "reposicao-hormonal",
    name: "Reposição Hormonal",
    area: "Reposição hormonal individualizada",
    summary:
      "Ajustes médicos individualizados para retomada do equilíbrio, vitalidade e bem-estar geral do paciente.",
  },
] as const;

export type Program = (typeof programs)[number];

export const areasWithoutPage = [
  "Prevenção cardiometabólica",
  "Terapias com vitaminas e injetáveis",
] as const;

export function getProgram(slug: string) {
  return programs.find((program) => program.slug === slug);
}

export const testimonial = {
  name: "Renata Cassandro",
  quote: "Sim, às vezes até eu me assusto. E não tive flacidez, graças a Deus.",
  measures: [
    { label: "Peso inicial", value: "89,0 kg" },
    { label: "Cintura inicial", value: "88 cm" },
    { label: "Peso atual", value: "58,5 kg" },
    { label: "Cintura atual", value: "67 cm" },
  ],
  notes: [
    "Mais do que números, é sobre autoestima, saúde e qualidade de vida.",
    "Resultado de dedicação a um plano profissional.",
    "Pele firme relatada, mesmo com perda expressiva de peso.",
    "Acompanhamento contínuo e plano individualizado.",
  ],
} as const;

export const faqs = [
  {
    question: "Onde o Dr. Lucas atende?",
    answer:
      "Em Catalão (GO), na R. Augusto Neto, 11, São João; em Goiânia (GO); e em consultas online para pacientes no Brasil. O endereço de Goiânia não está publicado neste site.",
  },
  {
    question: "Como agendar uma consulta?",
    answer:
      "O agendamento é feito com a equipe pelo WhatsApp (64) 98116-8122. Não há outro sistema de agenda publicado.",
  },
  {
    question: "O que a consulta inclui?",
    answer:
      "Avaliação clínica completa, análise de bioimpedância de última geração e estruturação de rotina alimentar personalizada.",
  },
  {
    question: "Qual é o registro profissional?",
    answer: "Dr. Lucas Abrahão Ferreira, CRM GO 19862.",
  },
] as const;

export const nav = [
  { href: "/sobre", label: "O Instituto" },
  { href: "/servicos", label: "Áreas" },
  { href: "/contato", label: "Contato" },
] as const;

export const imageSources = {
  logo: "https://institutodrlucasabrahao.com.br/logo.png",
  doutor: "https://institutodrlucasabrahao.com.br/IMG_2907.jpg",
  atendimento: "https://institutodrlucasabrahao.com.br/IMG_2923.jpg",
  relato: "https://institutodrlucasabrahao.com.br/xpx.jpeg",
} as const;
