def custom_prompt(vector_store, query):
    results = vector_store.similarity_search(query, k=2)
    source_knowledge = "\n".join([x.page_content for x in results])
    augment_prompt = f"""You are a helpful tutor in charge of guiding students in understanding notes provided in the context.
        If you don't know the answer, say you don't know. 
        You are to only answe questions based on the context provided.
        Use three sentence maximum and keep the answer concise. 
        Context: {source_knowledge}
    """
    
    return augment_prompt