def question_prompt(document, query):
    contexts = ""
    for context in document:
        contexts += f"{context.page_content}\n"
    prompt = f"""
    <|begin_of_text|><|start_header_id|>system<|end_header_id|>You are a helpful tutor in charge of guiding students in understanding notes provided in the context. Do not come out with any information not present in the context provided. You are to provide as much information as possible and do not have any answers in point form.

    Context: {contexts}
    Query: {query}
    <|eot_id|><|start_header_id|>assistant<|end_header_id|>
    Answer: """
    
    return prompt