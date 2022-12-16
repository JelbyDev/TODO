import { Task } from "~~/types";

const tasks: Task[] = [
  { id: 1, title: "Заехать в сервис", category_id: 1, isCompleted: false },
  { id: 2, title: "Позвонить клиенту", category_id: 1, isCompleted: false },
  { id: 3, title: "Робот пылесос", category_id: 2, isCompleted: false },
  { id: 4, title: "Сделать презентацию", category_id: 1, isCompleted: true },
];

export default tasks;
