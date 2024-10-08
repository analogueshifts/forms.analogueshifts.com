"use client";
import { useState } from "react";
import { Reorder } from "framer-motion";
import QuestionSection from "./question-section";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddQuestionForm from "./add-question-form";
import FormFallbackLoading from "../../components/fallback-loading";
import { clearUserSession } from "@/utils/clear-user-session";
import { useToast } from "@/contexts/toast";

interface FormQuestionsProps {
  uuid: string;
  token: string;
  questions: any;
}

const FormQuestions: React.FC<FormQuestionsProps> = ({
  uuid,
  token,
  questions,
}) => {
  const [vetQuestions, setVetQuestions]: any = useState(questions);
  const [loading, setLoading] = useState(false);

  const { notifyUser }: any = useToast();

  // Delete A question From the Database
  const handleDeleteQuestion = async (questionUUID: string) => {
    const axios = require("axios");
    const config = {
      method: "DELETE",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/delete/" +
        questionUUID,
      headers: { Authorization: "Bearer " + token },
    };

    try {
      // Delete Question
      await axios.request(config);
      notifyUser("success", "Your question has been removed.", "right");

      // Reset The state that holds our Questions
      setVetQuestions((prev: any) =>
        prev.filter((item: any) => item.uuid !== questionUUID)
      );
    } catch (error: any) {
      notifyUser(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          error.message ||
          "right"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  // This Function Uploads all the Question to the Database
  const uploadQuestions = async () => {
    const axois = require("axios");

    let reOrderedQuestions: any = [];
    // Update the Questions Order
    if (vetQuestions[0]) {
      vetQuestions.forEach((item: any, index: number) => {
        reOrderedQuestions.push({
          ...item,
          number: String(index + 1),
        });
      });
    }

    const config = {
      method: "POST",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/tools/form/question/store/" +
        uuid,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: reOrderedQuestions,
    };

    setLoading(true);

    try {
      await axois.request(config);
      setLoading(false);
      notifyUser("success", "Your Vet questions has been Updated", "right");
      setVetQuestions(reOrderedQuestions);
    } catch (error: any) {
      setLoading(false);
      notifyUser(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.data?.message ||
          error.message ||
          "right"
      );
      if (error?.response?.status === 401) {
        clearUserSession();
      }
    }
  };

  return (
    <main className="w-full py-10">
      {loading && <FormFallbackLoading />}
      <div className="w-full z-30 sticky top-[76px] bg-white mt-6 flex-wrap gap-5 flex justify-center md:justify-between items-center h-max py-5 ">
        <span className="font-semibold md:text-lg text-base text-primary-boulder950">
          QUESTIONS
        </span>

        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <span className="py-2 min-h-10 h-max cursor-pointer rounded-full px-4 md:px-8 flex justify-center items-center gap-3 border border-background-darkYellow font-normal md:text-base text-xs bg-transparent text-background-darkYellow">
                Add question
                <i className="fas fa-plus"></i>
              </span>
            </DialogTrigger>
            <DialogContent className="w-[90%] duration-300 max-w-[1000px] h-max max-h-[80dvh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-primary-boulder950">
                  Create new question
                </DialogTitle>
              </DialogHeader>
              <AddQuestionForm
                questionNumber={String(vetQuestions.length + 1)}
                submitQuestion={(data) => {
                  setVetQuestions((prev: any) => [...prev, data]);
                }}
              />
            </DialogContent>
          </Dialog>
          {vetQuestions[0] && (
            <button
              onClick={uploadQuestions}
              className={`px-4 md:px-8 text-[#FEFEFE] md:text-base text-xs  font-normal flex items-center gap-2 py-2 min-h-10 h-max bg-background-darkYellow rounded-full border-none cursor-pointer`}
            >
              Update Questions
            </button>
          )}
        </div>
      </div>
      <div className="w-full mt-5 z-20">
        <Reorder.Group onReorder={setVetQuestions} values={vetQuestions}>
          {vetQuestions.map((item: any) => (
            <QuestionSection
              handleDeleteQuestion={handleDeleteQuestion}
              data={item}
              key={item.number}
              setFormQuestions={setVetQuestions}
            />
          ))}
        </Reorder.Group>
      </div>
    </main>
  );
};

export default FormQuestions;
