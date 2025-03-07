# dotbase Coding Challenge

## Welcome 👋

Thank you for your interest in joining dotbase! This repository contains the coding challenges we use as part of our interview process. Please take a moment to read through this entire README before starting the challenges.

The challenges are designed to help us understand your coding style, problem-solving approach, and familiarity with modern web development practices.

## Tech Stack 💻

This project uses modern web technologies that we also (kind of) use in our production environment:

- [Vue 3](https://vuejs.org/guide/introduction.html) - Progressive JavaScript Framework
- [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) - Vue Framework for building full-stack applications
- [PrimeVue](https://primevue.org/) - UI Component Library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PrimeVue Icons](https://primevue.org/icons/#list) - Icon Library
- [FHIR](https://hl7.org/fhir/R4/) - Data format

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/dot-base/coding-challenge.git
cd coding-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Coding Exercises

### Goal 🎯

Your task is to render a Radar Chart using the provided responses to the PROMIS-33 Questionnaire in [FHIR format](https://hl7.org/fhir/R4/resourcelist.html).

<img width="500" alt="image" src="https://github.com/user-attachments/assets/9f560617-e97d-42e2-b5d9-5dc72b7ca7aa" />

### Requirements 📋

- Please use the UI components provided by the integrated UI library **PrimeVue**.
- Please add the radar chart to the **Data Hub** view.
- Please use the FHIR resources found in `server/fhir/`
- Please create an **endpoint** the frontend can consume to get the needed data to render the chart
- **[Optional]:** rendering the norm area in the radar chart (green area)

### Hints and Tips

1. You don't have to match the design of the example 100%
2. Beware of the scales used for the different domains. Better health is located in the center of the chart and worse health on the outside, independent of whether good health is represented by a high or a low value.
3. Make use of Nuxt utility functions, such as [`useFetch`](https://nuxt.com/docs/api/composables/use-fetch).
4. Have fun 🥳

### Submission Guideline 📥

Please fork this repository and **create a pull request** that can be reviewed by us.

### Evaluation Criteria 🤔

- **Implementation of Radar Chart**: Do you fulfill the requirements?
- **Code structure and quality**: Is the code well-organized and easy for others to pick up, extend, or maintain, demonstrating thoughtful design and clear intent?
- **Documentation**: Is it clear what your functions do and how they are used? Do you focus on the key points and strike the right balance of what is too little and what is too much? Do you explain controversial or unintuitive decisions you made?
- **Test coverage**: Do you test your code?
- **Pull request description**: Do you create PRs that are easy to review?
- **Commit structure**: Do you write atomic commits that are easy to understand?

Beyond the code itself we want to see if you can work autonomously and research the information needed. (However if something seems wrong, is unclear or blocks you, please definitely contact us!)

## Context 💬

### PROMIS-33

The PROMIS-33 (Patient-Reported Outcomes Measurement Information System-33) is a validated **questionnaire** designed to assess **health-related quality of life** of patients. It consists of **33 items** covering multiple domains of physical, mental, and social health.

1. **Physical Function** (inverted) – Measures mobility, strength, and ability to perform daily activities.
2. **Pain Interference** – Assesses how pain affects daily life.
3. **Fatigue** – Evaluates the severity and impact of fatigue.
4. **Depression** – Measures emotional distress and depressive symptoms.
5. **Anxiety** – Assesses feelings of fear, worry, and nervousness.
6. **Sleep Disturbance** – Evaluates sleep quality and difficulties.
7. **Social Roles and Activities** – Measures participation in social activities and role functioning.

#### Scoring of PROMIS-33

The individual answers are summed up for each domain and then converted into a T-score using a table.

A **T-score** indicates how a person's health score compares to the general population. The T-score scale is based on a **population mean** of **50**. This means:

- **T-score of 50** = **Average** for the general population.
- **T-score above 50** = **Better** health compared to the average population in case of Physical Function and **worse** health for all other domains.
- **T-score below 50** = **Worse** health compared to the average population in case of Physical Function and **better** health for all other domains.

Scoring tables for the original PROMIS-29 can be found [here](https://www.healthmeasures.net/images/PROMIS/manuals/PROMIS_Adult_Profile_Scoring_Manual.pdf).

More information: healthmeasures.net
