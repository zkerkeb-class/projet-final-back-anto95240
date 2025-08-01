import Category from "../schema/category.js";

// Récupère les catégories visibles pour l'utilisateur (globales + ses perso)
export const getCategoriesForUser = async (req, res) => {
  const userId = req.userId;
  try {
    const categories = await Category.find({
      $or: [
        { isDefault: true },
        { userId: userId }
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupère toutes les catégories
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Crée une nouvelle catégorie
export const postCategory = async (req, res) => {
  const userId = req.userId;
  try { 
    const newCategory = new Category({
      ...req.body,
      userId,
      isDefault: false
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la catégorie" });
  }
};

// Met à jour une catégorie par son ID
export const updateCategory = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

    if (category.isDefault) {
      // Création d'une copie perso au lieu de modifier la globale
      const userCategory = new Category({
        name: req.body.name || category.name,
        theme: req.body.theme || category.theme,
        color: req.body.color || category.color,
        userId: userId,
        isDefault: false
      });
      await userCategory.save();
      return res.json(userCategory);
    }

    // Vérifier la propriété de la catégorie perso
    if (category.userId.toString() !== userId) {
      return res.status(403).json({ message: "Interdit de modifier cette catégorie" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);

  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de la catégorie" });
  }
};

// Supprime une catégorie par son ID
export const deleteCategory = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });

    if (category.isDefault) {
      return res.status(403).json({ message: "Impossible de supprimer une catégorie globale" });
    }

    if (category.userId.toString() !== userId) {
      return res.status(403).json({ message: "Interdit de supprimer cette catégorie" });
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Catégorie supprimée avec succès" });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
  }
};

// initialise les catégories par défault pour les users
export const initCategories = async () => {
  const existingDefaults = await Category.find({ isDefault: true });
  if (existingDefaults.length > 0) {
    console.log(" Catégories par défaut déjà existantes.");
    return;
  }

  const defaultCategories = [
    { name: "Alimentation", theme: "Vie quotidienne", color: "#FF6384", isDefault: true },
    { name: "Transport", theme: "Vie quotidienne", color: "#36A2EB", isDefault: true },
    { name: "Logement", theme: "Vie quotidienne", color: "#8E44AD", isDefault: true },
    { name: "Streaming", theme: "Loisirs", color: "#F56384", isDefault: true },
    { name: "Jeux vidéo", theme: "Loisirs", color: "#9B59B6", isDefault: true },
    { name: "Cinéma", theme: "Loisirs", color: "#E67E22", isDefault: true },
    { name: "Salaire", theme: "Professionnel", color: "#4BC0C0", isDefault: true },
    { name: "Prime", theme: "Professionnel", color: "#2ECC71", isDefault: true },
    { name: "Épargne", theme: "Financier", color: "#1ABC9C", isDefault: true },
    { name: "Investissements", theme: "Financier", color: "#34495E", isDefault: true },
    { name: "Médecin", theme: "Santé & Bien-être", color: "#9966FF", isDefault: true },
    { name: "Pharmacie", theme: "Santé & Bien-être", color: "#C0392B", isDefault: true },
    { name: "Sport", theme: "Santé & Bien-être", color: "#27AE60", isDefault: true }
  ];

  await Category.insertMany(defaultCategories);
  console.log("Catégories par défaut insérées.");
};
