def custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=2)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""You are a helpful tutor in charge of guiding students in understanding notes provided in the context.
        If you don't know the answer, say you don't know. 
        You are to only answer questions based on the context provided.
        Use three sentence maximum and keep the answer concise. 
        Context: {source_knowledge}
    """
    
    return augment_prompt

def generate_question_custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=5)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""You are a helpful tutor in charge of making questions based on notes provided in the context. Please make questions that will are tested in the exams and are related to the topic.
        You are to only ask questions based on the context provided.
        Use three sentence maximum and keep the question concise.
        Context: {source_knowledge}
    """
    
    return augment_prompt