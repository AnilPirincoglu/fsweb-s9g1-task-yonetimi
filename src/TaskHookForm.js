import { nanoid } from 'nanoid';
import React from 'react'
import { useForm } from 'react-hook-form'

export default function TaskHookForm({ kisiler, submitFn }) {

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      id: nanoid(5),
      title: "",
      description: "",
      people: [],
    }, mode: 'onChange'
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    submitFn({ ...data, status: "yapılacak" })
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", { required: "title boş bırakılamaz" })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "boş bırakılamaz",
            minLength: { value: 10, message: "en az 10 karakter giriniz" },
            maxLength: { value: 100, message: "en fazla 100 karakter giriniz" }
          })}
        ></textarea>
        {errors.description && <p className="input-error">{errors.description.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", { required: "en az bir kişi seçin" })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <p className="input-error">{errors.people.message}</p>}
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form >
  )
}
