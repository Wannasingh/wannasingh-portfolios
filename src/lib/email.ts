import { toast } from "sonner";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
  isResumeRequest?: boolean;
}

export const sendEmail = async (formData: EmailFormData, resetForm: () => void) => {
  return toast.promise(
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }),
    {
      loading: 'Sending message...',
      success: async (response) => {
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        resetForm();
        return 'Message sent successfully!';
      },
      error: 'Failed to send message. Please try again.',
    }
  );
};